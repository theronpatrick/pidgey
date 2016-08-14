import React from 'react';

const linkUser = (user) => {

  return <a className="user-link" href={user.html_url} target="_blank">@{user.login}</a>
}

export default linkUser;
