import R from 'ramda'
import RS from 'ramdasauce'

export default (types, prefix) => {
  if (RS.isNilOrEmpty(types)) throw new Error('valid types are required')

  return R.pipe(
    R.trim,
    R.split(/\s/),
    R.map(R.pipe(R.trim)),
    R.without([null, '']),
    R.map((x) => [x, prefix ? prefix + x : x]),
    R.fromPairs
  )(types, prefix)
}
