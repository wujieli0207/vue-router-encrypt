// src/router/helper/query.js
import { isArray, isNull, isUndefined } from 'lodash-es'
import { AesEncryption } from '@/utils/cipher'
import type {
  LocationQuery,
  LocationQueryRaw,
  LocationQueryValue,
} from 'vue-router'

const aes = new AesEncryption()

/**
 *
 * @description 解密:反序列化字符串参数
 */
export function stringifyQuery(obj: LocationQueryRaw): string {
  if (!obj) return ''

  const result = Object.keys(obj)
    .map((key) => {
      const value = obj[key]

      if (isUndefined(value)) return ''

      if (isNull(value)) return key

      if (isArray(value)) {
        const resArray: string[] = []

        value.forEach((item) => {
          if (isUndefined(item)) return

          if (isNull(item)) {
            resArray.push(key)
          } else {
            resArray.push(key + '=' + item)
          }
        })
        return resArray.join('&')
      }

      return `${key}=${value}`
    })
    .filter((x) => x.length > 0)
    .join('&')

  return result ? `?${aes.encryptByAES(result)}` : ''
}

/**
 *
 * @description 解密:反序列化字符串参数
 */
export function parseQuery(query: string): LocationQuery {
  const res: LocationQuery = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) return res

  query = aes.decryptByAES(query)

  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = parts.shift()
    const val = parts.length > 0 ? parts.join('=') : null

    if (!isUndefined(key)) {
      if (isUndefined(res[key])) {
        res[key] = val
      } else if (isArray(res[key])) {
        ;(res[key] as LocationQueryValue[]).push(val)
      } else {
        res[key] = [res[key] as LocationQueryValue, val]
      }
    }
  })

  return res
}
