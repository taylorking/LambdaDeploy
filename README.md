# Lambda Deploy

### What this is
Heroku seems to have figured out deployment for the basic cloud platform. Basically, Heroku creates a remote git repository, you push code to that and it is automatically deployed to Heroku, and is immediately made available. This Lambda function emulates that behavior. 

##### How it works
This Lambda function is invoked with the Push model, in the form of a webhook from Github sent to AWS API Gateway. When new code is pushed to github, this function pulls the code, compresses it into a zip file, and uploads it to the function with the ARN specified in the URL parameter. I've only tested this with Node.js, but it should work with Java and Python as well.

AWS Lambda is very restrictive on what you are allowed to do in terms of using the underlying filesystem of the machine. This function basically relies on GNU zip and unzip binaries compiled for linux running on x86_64. 

### Setup
* [Configure AWS IAM Role and Policy]()
* [Create the Lambda function and upload the code
]()
* [Configure AWS API Gateway]()
* [Configure Github Webhooks]()

##### Configure AWS IAM Role and Policy
Create a new Lambda Role

![](http://i.imgur.com/DXCpWNS.png)

Attach the Lamda Full Access policy. We need to do this because we need to be able to call Lambda.updateFunctionCode

![](

##### Create the Lambda function and upload the code

Download and zip the source code

```{sh}
$ git clone https://github.com/taylorking/lambdacd.git
$ cd lambdacd
$ npm install
$ zip -r upload.zip *
```

Create a new Lambda Function using your IAM role, and the zip file you just created

![](http://i.imgur.com/dA31cQQ.png)

##### Configure AWS API Gateway

Create a new API

![](http://i.imgur.com/fitk8Xa.png)

Create a new POST method

![](http://i.imgur.com/gv39E4C.png)

Configure the POST method to invoke the lambda function

![](http://imgur.com/X2jyjXc.png)

Configure the request url parameters

![](http://imgur.com/FdCxofV.png)
![](http://i.imgur.com/9tYOPMW.png)

Create an Integration Request Mapping Template, and copy the code from inbound-integration-mapping-template.awsmappingtemplate

![](http://i.imgur.com/PRvUJjn.png)

Stage and Deploy your API

![](http://i.imgur.com/VPVPDkk.png)

Note the invoke url for your api

![](http://i.imgur.com/4teMqzH.png)

##### Configure Github Webhook

Note the arn for the Lambda function you want to deploy to

![](http://i.imgur.com/65NmGSo.png)

Configure the Github webhook in Repository Settings > Webhooks. The payload URL will be the Invoke URL from above, passing arn= the arn for your lambda function from above. For example, the url from my example was ```https://zigl5fbx1m.execute-api.us-west-2.amazonaws.com/githubDeploymentStage?arn=arn:aws:lambda:us-west-2:447751861833:function:DeployExample```



![](http://i.imgur.com/EuA1gFk.png)


### Usage

![](http://i.imgur.com/pRo0Arc.png)

Push some code

![](http://i.imgur.com/pTyLQPo.png)

It has been uploaded to lambda

![](http://i.imgur.com/RFzXBZr.png)
