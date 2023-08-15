async function csrfFetch(url, options = {}) {
    // Get the CSRF token from a meta tag or some other client-side storage
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  
    // Set up headers with the CSRF token
    const headers = Object.assign({}, options.headers, {
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    });
  
    // Make the fetch request with the additional headers
    const response = await fetch(url, Object.assign({}, options, { headers }));
  
    return response;
  }
  
  export default csrfFetch;
  