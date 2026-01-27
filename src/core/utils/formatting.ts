import moment from 'moment'

export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string // Return the input as is if it's not a string or an empty string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Well, if this needs to be explained, you've got a long way to go
export const capitalizeString = (string: string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string
  }
  return string.toUpperCase()
}

export const lowerCaseString = (string: string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string
  }
  return string.toLowerCase()
}

// Takes a javascript datetime object and returns a human readable date & time
// Sample:  18/07/2023 at 17:14
export const formatDate = (unformattedDate: string) => {
  const date = new Date(unformattedDate)

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return `${formattedDate} at ${formattedTime}`
}

// Dumb down the date -> March 26th 2025 at 19:02
export const humanReadableDate = (date: string) => {
  if (!date) {
    return '--'
  }
  // Parse the input date
  const parsedDate = moment(date)
  // Format the date to "MMMM DD YYYY" format
  const formattedDate = parsedDate.format('MMMM Do YYYY [at] HH:mm')

  return formattedDate
}

// Format currency helper: If showing amounts prefer using <Amount/> component (@/shared/components/amount/Amount.vue)
export const formatCurrency = (amount: number, currency?: string) => {
  const formattedAmount = `${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  if (currency) {
    return `${currency} ${formattedAmount}`
  }

  return formattedAmount
}

/**
 * Format date to YYYY-MM-DD string using local time
 */
export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Splits a variable name using a seperator and returns the words separated by spaces.
 * 'balls_of_steel' to 'balls of steel'
 * @param {string} variable - The variable name containing a seperator.
 * @param {string} separator - The character used to split the variable name.
 * @returns {string} - The variable name with spaces instead of seperator.
 */
export const splitVariables = (variable: string, separator: string): string => {
  if (!variable) return ''

  const wordsArray = variable.split(separator)
  const result = wordsArray.join(' ')
  return result
}
