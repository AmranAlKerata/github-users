import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [ githubUser, setGithubUser ] = useState(mockUser);
  const [ repos, setRepos ] = useState(mockRepos);
  const [ followers, setFollowers ] = useState(mockFollowers);

  // request loading
  const [ requests, setRequests ] = useState({ limit: 0, remaining: 0 });
  const [ loading, setLoading ] = useState(false);

  // error
  const [ error, setError ] = useState({ show: false, msg: "" });

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const resp = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
      if (err.message === "Request failed with status code 404") {
        toggleError(true, "There Is No User With That Username");
      } else {
        toggleError(true, err.message);
      }
    });

    if (resp) {
      setGithubUser(resp.data);
      const { repos_url, followers_url } = resp.data;

      const repos = axios(`${repos_url}?per_page=100`);

      const followers = axios(followers_url);

      await Promise.allSettled([
        await repos,
        await followers
      ]).then((data) => {
        const [ repos, followers ] = data;

        const status = "fulfilled";
        if (repos.status === status) {
          setRepos(repos.value.data);
        }
        if (followers.status === status) {
          setFollowers(followers.value.data);
        }
      });
    }
    checkRequests();
    setLoading(false);
  };

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { rate: { limit, remaining } } = data;
        remaining = limit - remaining;
        setRequests({ limit, remaining });
        if (remaining === 0) {
          toggleError(true, "Sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      checkRequests();
    }
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubProvider };
