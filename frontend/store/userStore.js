import { create } from "zustand";
import { postStore } from "./postsStore.js";

const userStore = create((set, get) => ({
  userData: { logged: false },
  setUserData: (userData) => set({ userData }),
  loginUser: async (data) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      set(() => ({
        userData: {
          ...response.user,
          accessToken: response.accessToken,
          logged: true,
        },
      }));
    }
    console.log(get().userData);

    return { success: response.success, message: response.message };
  },
  registerUser: async (data) => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const response = await res.json();

    return { success: response.success, message: response.message };
  },
  refreshToken: async () => {
    const res = await fetch("http://localhost:3000/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      set(() => ({
        userData: { ...get().userData, accessToken: response.accessToken },
      }));
    } else {
      set(() => ({
        userData: { logged: false },
      }));
    }

    return { success: response.success, message: response.message };
  },
  logoutUser: async () => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      set(() => ({
        userData: {
          logged: false,
        },
      }));
      return { success: true, perfil: response.user };
    }

    return { success: false, message: response.message };
  },
  deleteUser: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      set(() => ({
        userData: {
          logged: false,
        },
      }));
      return { success: true, message: "Conta deletada" };
    }

    return { success: false, message: response.message };
  },
  changeProfile: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/edit", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/edit", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      set({
        userData: {
          ...get().userData,
          ...response.editProfile,
        },
      });
      return { success: true, message: "Perfil alterado" };
    }

    return { success: false, message: response.message };
  },
  changeEmail: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/send-email-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/send-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: "Token enviado ao novo email" };
    }

    return { success: false, message: response.message };
  },
  otpToken: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/change-email", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/change-email", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: "Email alterado" };
    }

    return { success: false, message: response.message };
  },
  changeRole: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/change-role", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/change-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }
    const response = await res.json();
    if (response.success) {
      set(() => ({
        userData: {
          ...get().userData,
          ...response.user,
          logged: true,
          accessToken: token,
        },
      }));
      return { success: true, message: "Role alterado" };
    }
    return { success: false, message: response.message };
  },
  changePass: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }
    const response = await res.json();
    if (response.success) {
      return { success: true, message: "Senha alterado" };
    }
    return { success: false, message: response.message };
  },
  getProfile: async () => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, perfil: response.user };
    }

    return { success: false, message: response.message };
  },
  getProfileByUsername: async (username) => {
    let res = await fetch(`http://localhost:3000/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      return { success: true, perfil: response.user };
    }

    return { success: false, status: res.status, message: response.message };
  },
  followProfile: async (data, username) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/follow/follow-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/follow/follow-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      set(() => ({
        userData: {
          ...get().userData,
          following: [
            ...get().userData.following,
            { followerBy: { username: username } },
          ],
        },
      }));
      return { success: true, message: "Seguindo" };
    }

    return { success: false, message: response.message };
  },
  stopFollowingProfile: async (data, username) => {
    let token = get().userData?.accessToken;
    let res = await fetch("http://localhost:3000/auth/follow/stop-follow", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch("http://localhost:3000/auth/follow/stop-follow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      set((state) => ({
        userData: {
          ...state.userData,
          following: state.userData.following.filter(
            (follow) => follow.followerBy.username !== username
          ),
        },
      }));
      return { success: true, message: "Parou de seguir" };
    }

    return { success: false, message: response.message };
  },
  listFollower: async (username) => {
    let res = await fetch(`http://localhost:3000/list/follower/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      return { success: true, follower: response.follower || [] };
    }

    return { success: false, message: response.message };
  },
  listFollowing: async (username) => {
    let res = await fetch(`http://localhost:3000/list/following/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    const response = await res.json();
    if (response.success) {
      return { success: true, following: response.following || [] };
    }

    return { success: false, message: response.message };
  },
  blockFollower: async (data) => {
    let token = get().userData?.accessToken;
    let res = await fetch(`http://localhost:3000/auth/follow/block`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch(`http://localhost:3000/auth/follow/block`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }
    const response = await res.json();
    if (response.success) {
      set(() => ({
        userData: {
          ...get().userData,
          ...response.user,
          logged: true,
          accessToken: token,
        },
      }));
      return { success: true, message: "Seguidor retirado" };
    }
    return { success: false, message: response.message };
  },
  subscribeEvent: async (publicationId) => {
    let token = get().userData?.accessToken;
    let res = await fetch(
      `http://localhost:3000/auth/event-subscription/${publicationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch(
        `http://localhost:3000/auth/event-subscription/${publicationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
    }
    const response = await res.json();
    if (response.success) {
      const alreadySubscribed = get().userData.EventSubscription.some(
        (sub) => sub.publicationId === publicationId
      );

      if (!alreadySubscribed) {
        set({
          userData: {
            ...get().userData,
            EventSubscription: [
              ...get().userData.EventSubscription,
              { publicationId },
            ],
          },
        });
      }

      return { success: true, message: "Inscrito" };
    }
    return { success: false, message: response.message };
  },
  deleteSubscribeEvent: async (publicationId) => {
    let token = get().userData?.accessToken;
    let res = await fetch(
      `http://localhost:3000/auth/event-subscription/${publicationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (res.status === 401) {
      const refreshResult = await get().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData?.accessToken;

      res = await fetch(
        `http://localhost:3000/auth/event-subscription/${publicationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
    }
    const response = await res.json();
    if (response.success) {
      set(() => ({
        userData: {
          ...get().userData,
          EventSubscription: get().userData.EventSubscription.filter(
            (sub) => sub.publicationId !== publicationId
          ),
        },
      }));

      return { success: true, message: "inscrição cancelada" };
    }
    return { success: false, message: response.message };
  },
  forgotPass: async (data) => {
    let res = await fetch(`http://localhost:3000/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (response.success) {
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  resetPass: async (token, data) => {
    let res = await fetch(`http://localhost:3000/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (response.success) {
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  deletePost: async (id) => {
    let token = get().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      const posts = [...postStore.getState().postsData.posts].filter(
        (p) => p.publicationId != id
      );
      set(() => ({
        postsData: { ...postStore.getState().postsData, posts },
      }));

      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  createPost: async (data) => {
    let token = get().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/post/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/post/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: response.message, post: response.post };
    }

    return { success: false, message: response.message };
  },

  createEvent: async (data) => {
    let token = get().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/event/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/event/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: response.message, post: response.post };
    }

    return { success: false, message: response.message };
  },
  editPost: async (publicationId, data) => {
    let token = get().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/post/${publicationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/post/${publicationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: response.message, post: response.post };
    }

    return { success: false, message: response.message };
  },
  editEvent: async (publicationId, data) => {
    let token = get().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/event/${publicationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = get().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/event/${publicationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
        credentials: "include",
      });
    }

    const response = await res.json();

    if (response.success) {
      return { success: true, message: response.message, post: response.post };
    }

    return { success: false, message: response.message };
  },
}));

export { userStore };
