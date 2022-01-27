# checker

gets a session id and info about packages, and checks if they already exist in the package manager or not 

## specs 

schema info is in the main repo[https://github.com/linux-devops-opensource/pumba], including the Session and the Pkg specs.

## specs tldr 

### request 
``` sh 
// Session
{
	"sid": "abc12",
	"type":"npm/maven/whatever",
  	// Pkg[]
	"pkgs": 
	[
		{
			"packageName": "XXXX",
      			"version": "1.2.3",
			"sha1": "9a5f699051b1e7073328f2a008968b64ea2955d2"
		},
		{
			"packageName": "XXXXX",
      			"version": "5.9.07",
			"sha1": "e138cc75e040c727b1966fe5e5f8c9aee256fe3b"
		}, ...
	]
}
```

### response 
it will create "existInTarget" (if doesn't exist) and return the object

``` sh 
// Session
{
	"sid": "abc12",
	"type":"npm/maven/whatever",
	// Pkg[]
	"pkgs": 
	[
		{
			"packageName": "XXXX",
      			"version": "1.2.3",
			"sha1": "9a5f699051b1e7073328f2a008968b64ea2955d2", 
      			"existInTarget": false
		},
		{
			"packageName": "XXXXX",
      			"version": "5.9.07",
			"sha1": "e138cc75e040c727b1966fe5e5f8c9aee256fe3b", 
      			"existInTarget": true
		}, ...
	]
}
```
