const handleRequest = async <T>(request: () => Promise<{ data: T; status: number }>) => {
  try {
    const response = await request();
    return { status: response.status, data: response.data, error: null };
  } catch (error: any) {
    if (!error.response) {
      return { data: null, error: { message: "No response from server", details: error.message } };
    }
    return { data: null, code: error.response.status, error: error.response.data || { message: error.message } };
  }
};

export default handleRequest;
