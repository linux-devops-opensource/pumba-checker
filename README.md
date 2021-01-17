# pumba-checker
pumba-checker accepting JSON by /api/checkpackages and returning a json describing which packages can or cant be uploaded
## JSON Schema

```{
	"type":"npm/maven/etc",
	"packages": [
		{
			"packageName": "XXXX",
			"sha1": "9a5f699051b1e7073328f2a008968b64ea2955d2"
		},
		{
			"packageName": "XXXXX",
			"sha1": "e138cc75e040c727b1966fe5e5f8c9aee256fe3b"
		},
		{
			"packageName": "XXXXX",
			"sha1": "kakipipipi"
		}
		]
}
```

## Response JSON
```
[
    {
        "name": "packagename",
        "statusCode": 400,
        "status": "Package is already uploaded"
    },
        "name": "packagename",
        "statusCode": 200,
        "status": "Package can be uploaded"
    }
]
```

