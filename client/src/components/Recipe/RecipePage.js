import React from "react";
import { withRouter } from "react-router-dom";
import { GET_RECIPE } from "../../queries";
import { Query } from "react-apollo";

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading...</div>;
        if (error) return <div>error...</div>;
        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>CreatedBy: {data.getRecipe.createdBy}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
