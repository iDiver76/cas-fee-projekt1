export default class Utility  {

  ajax(method, url, data, headers) {
    return $.ajax({
      dataType: "json",
      contentType: "application/json",
      headers: headers,
      method: method,
      url: url,
      data: data ? JSON.stringify(data) : undefined
    });
  }
}