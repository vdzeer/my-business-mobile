import moment from 'moment';
import axiosInstance from '../axios';
import { BASE_API_URL } from '../config';

export const signIn = data =>
  axiosInstance.post(`/user-api/auth/login`, data, {
    headers: { Authorization: null },
  });

export const googleApi = data =>
  axiosInstance.post(`/user-api/auth/google`, data, {
    headers: { Authorization: null },
  });

export const appleApi = data =>
  axiosInstance.post(`/user-api/auth/apple`, data, {
    headers: { Authorization: null },
  });

export const subscriptionApi = id =>
  axiosInstance.put(`/user-api/user/update-subscription`, {
    subscriptionId: id,
  });

export const forgot = data =>
  axiosInstance.post(`/user-api/user/forget-password`, data, {
    headers: { Authorization: null },
  });

export const resetPasswordApi = data =>
  axiosInstance.post(`/user-api/user/reset-password`, data, {
    headers: { Authorization: null },
  });

export const signUp = data =>
  axiosInstance.post(`/user-api/auth/registration`, data, {
    headers: { Authorization: null },
  });

export const getMeUser = () => axiosInstance.get(`/user-api/user/me`);

export const updateMeUser = data => {
  return fetch(BASE_API_URL + `/user-api/user/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const createOwnBusiness = data => {
  return fetch(BASE_API_URL + `/business-api/business/create`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const addUserForBusiness = data => {
  return axiosInstance.post(`/business-api/business/add-user`, data);
};

export const inviteUserForBusiness = data => {
  return axiosInstance.post(`/business-api/business/invite-user`, data);
};

export const deleteUserForBusiness = data => {
  return axiosInstance.post(`/business-api/business/delete-user`, data);
};
export const updateOwnBusiness = data => {
  return fetch(BASE_API_URL + `/business-api/business/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const loginOwnBusiness = data => {
  return axiosInstance.post(`/business-api/business/login`, data);
};

export const checkPromo = data => {
  return axiosInstance.post(`/business-api/promocode/check`, data);
};
export const deleteOwnBusiness = data => {
  return axiosInstance.delete(`/business-api/business/delete`, {
    data: { businessId: data },
  });
};

export const getBusinessInventory = data => {
  return axiosInstance.get(`/business-api/inventory/get-all/${data}`);
};

export const createBusinessInventory = data => {
  return fetch(BASE_API_URL + `/business-api/inventory/create`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBusinessInventory = data => {
  return fetch(BASE_API_URL + `/business-api/inventory/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBusinessInventory = data => {
  return axiosInstance.delete(`/business-api/inventory/delete`, {
    data: { inventoryId: data },
  });
};

export const getBusinessProduct = data => {
  return axiosInstance.get(`/business-api/product/get-all?businessId=${data}`);
};

export const getBusinessCategories = data => {
  return axiosInstance.get(`/business-api/category/get-all/${data}`);
};

export const createBusinessProduct = data => {
  return fetch(BASE_API_URL + `/business-api/product/create`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBusinessProduct = data => {
  return fetch(BASE_API_URL + `/business-api/product/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBusinessProduct = data => {
  return axiosInstance.delete(`/business-api/product/delete`, {
    data: { productId: data },
  });
};

export const createBusinessCategory = data => {
  return fetch(BASE_API_URL + `/business-api/category/create`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBusinessCategory = data => {
  return fetch(BASE_API_URL + `/business-api/category/update`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: axiosInstance.defaults.headers.common.Authorization,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBusinessCategory = data => {
  return axiosInstance.delete(`/business-api/category/delete`, {
    data: { categoryId: data },
  });
};

export const getBusinessSuppliers = data => {
  return axiosInstance.get(`/business-api/supplier/get-all/${data}`);
};

export const createBusinessSupplier = data => {
  return axiosInstance.post(`/business-api/supplier/create`, data);
};

export const updateBusinessSupplier = data => {
  return axiosInstance.put(`/business-api/supplier/update`, data);
};

export const deleteBusinessSupplier = data => {
  return axiosInstance.delete(`/business-api/supplier/delete`, {
    data: { supplierId: data },
  });
};

export const getBusinessOrders = data => {
  return axiosInstance.get(
    `/business-api/order/get-all/${data}/?date=${moment(new Date()).format(
      'YYYY-MM-DD',
    )}`,
  );
};

export const createBusinessOrder = data => {
  return axiosInstance.post(`/business-api/order/create`, data);
};

export const deleteBusinessOrder = data => {
  return axiosInstance.delete(`/business-api/order/delete`, {
    data: { supplierId: data },
  });
};

export const getBusinessPromocodes = data => {
  return axiosInstance.get(`/business-api/promocode/get-all/${data}`);
};

export const createBusinessPromocode = data => {
  return axiosInstance.post(`/business-api/promocode/create`, data);
};

export const updateBusinessPromocode = data => {
  return axiosInstance.put(`/business-api/promocode/update`, data);
};

export const deleteBusinessPromocode = data => {
  return axiosInstance.delete(`/business-api/promocode/delete`, {
    data: { supplierId: data },
  });
};
