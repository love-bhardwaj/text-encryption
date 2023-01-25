## Generate a private key using OpenSSL

```
openssl genrsa -aes128 -out private_key.pem 1024
```

## Generate public key for the private key

```
openssl rsa -in private_key.pem -pubout > public_key.pem
```

## Run the script to decrypt a encrypted string

### Requirements:

1. Node Version 14 or above installed
2. `ts-node` installed (run `npm install -g ts-node`)
3. Install the dependencies of the project using `npm install` or simple `npm ci`

### Running the script:

```
ts-node index.ts --f=<FILE_PATH_TO_PRIVATE_KEY> --p=<PARAPHRASE> --et=<ENCRYPTED_TOKEN>
```

`--f` is the file to your private key
`--p` is the paraphrase you used to generate the keys
`--et` is the encrypted text that you have received via email
`--d` is for debugging what values were passed for encrypted text and paraphrase
