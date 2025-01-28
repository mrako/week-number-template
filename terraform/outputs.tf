output "s3_bucket_url" {
  value = aws_s3_bucket_website_configuration.react_app.website_endpoint
}

output "cloudfront_distribution_url" {
  value = "https://${aws_cloudfront_distribution.react_app.domain_name}"
}
