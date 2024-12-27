import jhqn from '@jhqn/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default jhqn(
  {
    lessOpinionated: true,
    stylistic: {
      overrides: {
        'style/indent': 'off',
        'style/multiline-ternary': 'off',
        'style/operator-linebreak': 'off',
        'style/quotes': 'off',
      },
    },
  },
  oxlint.configs['flat/recommended']
)
