import React, { useState } from 'react';

const Gif = ({ gif }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div key={gif.id} className="gif">
      <img
        alt="gif"
        src={gif.images.fixed_height.url}
        onClick={() => {
          setExpanded(!expanded);
        }}
      />
      {expanded && (
        <div>
          <p>
            From:{' '}
            {gif.user ? (
              <a href={gif.user?.profile_url}>{gif.username}</a>
            ) : (
              <a href={gif.source}>Source</a>
            )}
          </p>
          <p>Rating: {gif.rating.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default Gif;
