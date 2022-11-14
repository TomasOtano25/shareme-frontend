import groq from "groq";
// queries

export const userQuery = (userId) => {
  const query = groq`*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = groq`*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'] {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    }
  }`;

  return query;
};

export const feedQuery = groq`*[_type == "pin"] | order(_createAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    }
  }
}`;
