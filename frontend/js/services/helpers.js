
const reduce = () => {
  const a = ('àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;' + 'ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź').split('')
  const b = ('aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------' + 'aaaaaaaaceeeeeeiiiilnoooooosuuuunczz').split('')

  return a.reduce((acc, current, index) => {
    const exist = acc.a.find((char) => char === current)

    if (exist) {
      return acc
    }

    acc.a.push(current)
    acc.b.push(b[index])

    return acc
  }, {
    a: [],
    b: []
  })
}

const reduced = reduce()
const a = reduced.a.join('') // "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;ąãåćęłõøż"
const b = reduced.b.join('') // "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aaacelooz"
const p = new RegExp(a.split('').join('|'), 'g')

function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c =>
      b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export default {
  slugify
}
