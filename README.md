#Lambda Deploy

### What this is
This is a lambda function that can be used to pull a Lambda function's code from Github, and upload that code to AWS.

#### How it works
AWS Lambda is very restrictive on what you are allowed to do in terms of using the underlying filesystem of the machine. This function basically relies on GNU zip and unzip binaries compiled for linux running on x86_64. 

### Usage
* [Configure AWS IAM Role and Policy]()
* [Create the Lambda function and upload the code
]()
* [Configure AWS API Gateway]()
* [Configure Github Webhooks]()

#### Configure AWS IAM Role and Policy


#### Create the Lambda function and upload the code

Download and zip the source code

```{sh}
$ git clone https://github.com/taylorking/lambdacd.git
$ cd lambdacd
$ zip -r upload.zip *
```

Create a new Lambda Function using your IAM role, and the zip file you just created

![](http://i.imgur.com/dA31cQQ.png)

#### Configure AWS API Gateway