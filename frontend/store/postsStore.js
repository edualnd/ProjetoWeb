import { create } from "zustand";
import { userStore } from "./userStore.js";

const postStore = create((set, get) => ({
  postsData: { carousel: [], posts: [] },
  getCarousel: async () => {
    let res = await fetch("http://localhost:3000/newer-event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      const carousel = [...response.posts];
      set(() => ({ postsData: { ...get().postsData, carousel } }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  getPosts: async () => {
    let res = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      console.log(response.data);
      const posts = [...response.data];
      set(() => ({
        postsData: { ...get().postsData, posts },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },

  ratePost: async (id, data) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    }

    const response = await res.json();

    if (response.success) {
      userStore.setState((state) => ({
        userData: {
          ...state.userData,
          Rating: [...state.userData.Rating, response.rating],
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  editRatePost: async (id, data) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    }

    const response = await res.json();

    if (response.success) {
      userStore.setState((state) => ({
        userData: {
          ...state.userData,
          Rating: state.userData.Rating.map((rating) =>
            rating.publicationId === id ? { ...rating, ...data.rating } : rating
          ),
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  deleteRate: async (id) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
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

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/rating/${id}`, {
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
      userStore.setState((state) => ({
        userData: {
          ...state.userData,
          Rating: state.userData.Rating.filter(
            (rating) => rating.publicationId !== id
          ),
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  fetchData: async () => {
    const res = await get().getCarousel();
    const res2 = await get().getPosts();

    const response = res.success && res2.success;
    if (response) {
      return { success: true, message: "Pego com sucesso" };
    }
    return { success: false, message: "Erro ao pegar" };
  },
  getComments: async (id) => {
    let res = await fetch(`http://localhost:3000/${id}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const response = await res.json();

    if (response.success) {
      const comments = response.comments;

      const updatedPosts = get().postsData.posts.map((post) => {
        const postComments = comments.filter(
          (comment) => comment.publicationId === post.publicationId
        );

        return {
          ...post,
          comments: postComments,
        };
      });

      set(() => ({
        postsData: {
          ...get().postsData,
          posts: updatedPosts,
        },
      }));

      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  deleteComment: async (id) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/comments/delete/${id}`, {
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

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/comments/delete/${id}`, {
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
      const updatedPosts = get().postsData.posts.map((post) => {
        if (post.comments) {
          const filteredComments = post.comments.filter(
            (comment) => comment.commentId !== id
          );

          return {
            ...post,
            comments: filteredComments,
          };
        }

        return post;
      });

      set(() => ({
        postsData: {
          ...get().postsData,
          posts: updatedPosts,
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  editComment: async (id, data) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/comments/change/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/comments/change/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    }

    const response = await res.json();

    if (response.success) {
      const updatedPosts = get().postsData.posts.map((post) => {
        if (post.comments) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.commentId === id) {
              return {
                ...comment,
                comment: data.comment,
              };
            }
            return comment;
          });

          return {
            ...post,
            comments: updatedComments,
          };
        }

        return post;
      });

      set(() => ({
        postsData: {
          ...get().postsData,
          posts: updatedPosts,
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  createComment: async (id, data) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(`http://localhost:3000/auth/comments/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = userStore.getState().userData.accessToken;

      res = await fetch(`http://localhost:3000/auth/comments/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    }

    const response = await res.json();

    if (response.success) {
      const updatedPosts = get().postsData.posts.map((post) => {
        if (post.publicationId === response.newComment.publicationId) {
          return {
            ...post,
            comments: post.comments
              ? [...post.comments, response.newComment]
              : [response.newComment],
          };
        }

        return post;
      });

      set(() => ({
        postsData: {
          ...get().postsData,
          posts: updatedPosts,
        },
      }));
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  },
  listSubs: async (id) => {
    let token = userStore.getState().userData.accessToken;

    let res = await fetch(
      `http://localhost:3000/auth/event-subscription/list/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (res.status === 401) {
      const refreshResult = await userStore.getState().refreshToken();
      if (!refreshResult.success) {
        return { success: false, message: "Re-login necessário" };
      }

      token = userStore.getState().userData.accessToken;

      res = await fetch(
        `http://localhost:3000/auth/event-subscription/list/${id}`,
        {
          method: "GET",
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
      return { success: true, message: response.message, subs: response.subs };
    }

    return { success: false, message: response.message };
  },
}));
export { postStore };
