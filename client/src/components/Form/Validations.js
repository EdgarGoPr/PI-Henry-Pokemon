export default function validations(form) {
  let error = {}

  if (!form.name || !form.name.length) {
    error.name = 'Enter pokemon name'
  }

  const life = parseInt(form.life)
  if (isNaN(life) || life < 1 || life > 255) {
    error.life = 'Choose between 1 and 255'
  }

  const attack = parseInt(form.attack)
  if (isNaN(attack) || attack < 1 || attack > 255) {
    error.attack = 'Choose between 1 and 255'
  }

  const defense = parseInt(form.defense)
  if (isNaN(defense) || defense < 1 || defense > 255) {
    error.defense = 'Choose between 1 and 255'
  }

  const speed = parseInt(form.speed)
  if (isNaN(speed) || speed < 1 || speed > 255) {
    error.speed = 'Choose between 1 and 255'
  }

  const height = parseInt(form.height)
  if (isNaN(height) || height < 1 || height > 255) {
    error.height = 'Choose between 1 and 255'
  }

  const weight = parseInt(form.weight)
  if (isNaN(weight) || weight < 1 || weight > 255) {
    error.weight = 'Choose between 1 and 255'
  }

  if(form.image.length === 0) {
    error.img = 'Enter an image url'
  }

  if (form.type.length > 2) {
    error.type = 'Can not use more than two types'
  }

  return error
}