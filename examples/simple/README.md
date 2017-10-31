# Simple example

Install the npm packages
```
npm install
```
Build the project
```
npm run build
```
Run the lambda local test to see it in action
```
npm run test
```

If everything goes well you can see the output of the function
```
info: ------
info: {
	"version": "1.0",
	"response": {
		"shouldEndSession": true,
		"outputSpeech": {
			"type": "SSML",
			"ssml": "<speak> Hello, your name is: Test User </speak>"
		}
	},
	"sessionAttributes": {}
}
info: ------
```
