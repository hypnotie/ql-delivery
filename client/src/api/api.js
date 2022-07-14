export const homeAPI = {
  async getBrands() {
    const response = await fetch(`/api/shops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  async getProducts(shopId) {
    const response = await fetch(`/api/products/${shopId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};

export const cartAPI = {
  async createOrder(order) {
    const response = await fetch(`/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    return response.json();
  },
};
