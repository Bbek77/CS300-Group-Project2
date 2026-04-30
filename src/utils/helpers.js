/**
 * Utility helpers for the streaming app
 */

/**
 * Format a rating value to a fixed decimal place
 * @param {number} rating - The rating value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted rating string
 */
export const formatRating = (rating, decimals = 1) => {
  if (typeof rating !== 'number' || Number.isNaN(rating)) {
    return 'N/A';
  }
  return rating.toFixed(decimals);
};

/**
 * Format a title to title case
 * @param {string} title - The title to format
 * @returns {string} Title-cased string
 */
export const formatTitle = (title) => {
  if (typeof title !== 'string') {
    return '';
  }
  return title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncate text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Check if a media item matches a search query
 * @param {object} mediaItem - The media object with id, title, type, genre, etc.
 * @param {string} query - Search query string
 * @returns {boolean} True if media matches query
 */
export const matchesSearchQuery = (mediaItem, query) => {
  if (!query || typeof query !== 'string') {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return (
    mediaItem.title.toLowerCase().includes(normalizedQuery) ||
    mediaItem.genre.toLowerCase().includes(normalizedQuery) ||
    mediaItem.type.toLowerCase().includes(normalizedQuery)
  );
};

/**
 * Sort media items by a field
 * @param {array} items - Array of media items
 * @param {string} sortBy - Field name to sort by ('title', 'rating', 'type')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {array} Sorted array
 */
export const sortMedia = (items, sortBy = 'title', order = 'asc') => {
  const sorted = [...items];

  sorted.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Get unique values from an array of objects
 * @param {array} items - Array of items
 * @param {string} field - Field name to extract unique values from
 * @returns {array} Array of unique values
 */
export const getUniqueValues = (items, field) => {
  const seen = new Set();

  return items
    .map((item) => item[field])
    .filter((value) => {
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
};

/**
 * Group media items by a field
 * @param {array} items - Array of media items
 * @param {string} field - Field to group by
 * @returns {object} Object with grouped items
 */
export const groupMediaBy = (items, field) => {
  return items.reduce((acc, item) => {
    const key = item[field];

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
};

/**
 * Validate an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce a function call
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;

  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Local storage helper: get item
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Stored value or default
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Local storage helper: set item
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} True if successful
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Local storage helper: remove item
 * @param {string} key - Storage key
 * @returns {boolean} True if successful
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};