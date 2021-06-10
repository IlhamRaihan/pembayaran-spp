// tailwind.config.js
const colors = require('tailwindcss/colors')
module.exports = {
theme: {
extend: {
colors: {
'light-blue': colors.lightBlue,
cyan: colors.cyan,
},
},
},
variants: {},
plugins: [
require('@tailwindcss/forms'),
],
}
