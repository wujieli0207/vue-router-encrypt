// src\utils\cipher.ts
import { encrypt, decrypt } from 'crypto-js/aes'
import { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import UTF8 from 'crypto-js/enc-utf8'

// 注意 key 和 iv 至少都需要 16 位
const AES_KEY = '1111111111000000'
const AES_IV = '0000001111111111'

export class AesEncryption {
  private key
  private iv

  constructor(key = AES_KEY, iv = AES_IV) {
    this.key = parse(key)
    this.iv = parse(iv)
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    }
  }

  encryptByAES(text: string) {
    return encrypt(text, this.key, this.getOptions).toString()
  }

  decryptByAES(text: string) {
    return decrypt(text, this.key, this.getOptions).toString(UTF8)
  }
}
