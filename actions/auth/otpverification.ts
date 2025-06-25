export const handleOtp = async (
  e: { preventDefault: () => void },
  data: { email: string },
  otp: string
): Promise<boolean> => {
  e.preventDefault();

  if (!otp) {
    console.error("OTP is required");
    return false;
  }

  try {
    const res = await fetch("/api/user/verifyotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, otp }),
    });

    if (res.ok) {
      const resData = await res.json();
      console.log("OTP verification successful:", resData);
      return true;
    }
    console.error("Network response was not ok");
    return false;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};
