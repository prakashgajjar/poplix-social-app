export const handleSignup = async (
  e: { preventDefault: () => void },
  data: { email: string; password: string; fullname: string; username: string }
): Promise<boolean> => {
  e.preventDefault();

  if (!data.email || !data.password || !data.fullname || !data.username) {
    console.error("All fields are required for signup");
    return false;
  }

  try {
    const res = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Signup failed:", err.message || "Unknown error");
      return false;
    }

    const result = await res.json();
    console.log("Signup successful:", result);
    return true;

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return false;
  }
};
