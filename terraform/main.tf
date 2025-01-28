provider "aws" {}

resource "aws_s3_bucket" "react_app" {
  bucket = var.bucket_name

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [versioning, logging]
  }
}

resource "aws_s3_bucket_website_configuration" "react_app" {
  bucket = aws_s3_bucket.react_app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "react_app" {
  bucket = aws_s3_bucket.react_app.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

# Allow public access to S3 bucket content
resource "aws_s3_bucket_policy" "react_app_policy" {
  bucket = aws_s3_bucket.react_app.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = ["${aws_s3_bucket.react_app.arn}/*"]
      Condition = {
        Bool = {"aws:SecureTransport" : "true"}
      }
    }]
  })
}

# Deploy React app files to S3
resource "aws_s3_object" "react_app_files" {
  for_each = fileset("../dist", "**/*")

  bucket      = aws_s3_bucket.react_app.id
  key         = each.value
  source      = "../dist/${each.value}"
  etag        = filemd5("../dist/${each.value}")
  content_type = lookup({
    html = "text/html",
    css  = "text/css",
    js   = "application/javascript",
    png  = "image/png",
    jpg  = "image/jpeg",
    svg  = "image/svg+xml",
    ico  = "image/x-icon"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")
}

# CloudFront Distribution for the React app
resource "aws_cloudfront_distribution" "react_app" {
  origin {
    domain_name = aws_s3_bucket.react_app.bucket_regional_domain_name
    origin_id   = "S3-react-app-origin"
    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/${aws_cloudfront_origin_access_identity.react_app.id}"
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = "S3-react-app-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    compress = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "react_app" {
  comment = "CloudFront Origin Access Identity for React app"
}
