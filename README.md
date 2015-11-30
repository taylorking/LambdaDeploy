#Lambda Deploy

### What this is
Heroku seems to have figured out deployment for the basic cloud platform. Basically, Heroku creates a remote git repository, you push code to that and it is automatically deployed to Heroku, and is immediately made available. This Lambda function emulates that behavior. 

##### How it works
This Lambda function is invoked with the Push model, in the form of a webhook from Github sent to AWS API Gateway. When new code is pushed to github, this function pulls the code, compresses it into a zip file, and uploads it to the function with the ARN specified in the URL parameter.

AWS Lambda is very restrictive on what you are allowed to do in terms of using the underlying filesystem of the machine. This function basically relies on GNU zip and unzip binaries compiled for linux running on x86_64. 

### Setup
* [Configure AWS IAM Role and Policy]()
* [Create the Lambda function and upload the code
]()
* [Configure AWS API Gateway]()
* [Configure Github Webhooks]()

##### Configure AWS IAM Role and Policy


##### Create the Lambda function and upload the code

Download and zip the source code

```{sh}
$ git clone https://github.com/taylorking/lambdacd.git
$ cd lambdacd
$ zip -r upload.zip *
```

Create a new Lambda Function using your IAM role, and the zip file you just created

![](http://i.imgur.com/dA31cQQ.png)

### Configure AWS API Gateway

We need a way for github to be able to push to our AWS Lambda function and tell us that an update is available. With a Github webhook, we employ the push model in AWS Lambda, creating an event triggered with HTTPS


## Usage
