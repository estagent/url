const remove = (url, key) => {
  const parts = url.split('?')
  if (parts.length >= 2) {
    let prefix = encodeURIComponent(key) + '='
    let pars = parts[1].split(/[&;]/g)
    //reverse iteration as may be destructive
    for (let i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1)
      }
    }
    url = parts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
  }
  return url
}

const add = (url, key, value) => {
  if (!url || !key) {
    throw 'url/key null'
  }
  const separator = url.indexOf('?') !== -1 ? '&' : '?'
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  if (url.match(re)) {
    url = url.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    url = url + separator + key + '=' + value
  }
  return url
}

export const addToQuery = (url, params) => {
  for (const [key, value] of Object.entries(params)) {
    url = add(url, key, value)
  }
  return url
}

export const removeQueryParam = (url, keys) =>
  keys
    ? keys instanceof Array
      ? keys.forEach(key => remove(url, key))
      : remove(url, keys)
    : url.split('?')[0]

export const hasQueryParam = (url, key) =>
  url.match(new RegExp('([?&])' + key + '=.*?(&|$)', 'i'))

export const url = path =>
  document.location.origin +
  (path ? (path.charAt(0) === '/' ? path : '/' + path) : '')
