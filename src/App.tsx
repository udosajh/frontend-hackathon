import React from "react";
import "./App.css";
import * as axios from "axios";
import Card from "@material-ui/core/card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent, Typography, Container, Grid, Button, CardActions, CircularProgress, Backdrop } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

interface Recipe {
  id: string;
  image: string;
  description: string;
  label: String;
  price: string;
  category: string;
  name: string;
}

export default class App extends React.Component {


  state = {
    recipes: [] as Recipe[],
    isRecipeLoaded: false
  };

  componentWillMount() {
    (axios.default.get("http://starlord.hackerearth.com/recipe") as Promise<axios.AxiosResponse<Recipe[]> | never>).then((recipes: axios.AxiosResponse<Recipe[]>) => {
      this.setState(
        {
          isRecipeLoaded: true,
          recipes: recipes.data
        }
      );
      console.log("state updated", this.state);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  presentRecipes = () => {
    console.log("present recipes", this.state.recipes);
    return this.state.recipes.map((recipe: Recipe) => {
      return (
        <Card key={recipe.id} style={{ margin: "20px 20px 20px 20px", width: 300 }}>
          <div style={{
            width: 300,
            height: 270
          }}>
            <CardMedia
              component="img"
              image={recipe.image}
              title={String(recipe.label)}
              height="250"
            />
          </div>

          <CardContent style={{ height: 90 }}>

            <Typography gutterBottom variant="h5" component="h2" align="center">
              {recipe.name}
            </Typography>

            <Typography align="center">
              Price ${recipe.price}
            </Typography>

          </CardContent>

          <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button style={{ paddingTop: 5, paddingBottom: 5 }} color="primary" size="small">
              <ShoppingCart /> <span style={{ marginLeft: 10 }}>Buy</span>
            </Button>
          </CardActions>
        </Card >
      );
    });
  }

  render() {
    const { isRecipeLoaded } = this.state;
    if (isRecipeLoaded) {
      return (
        <Container>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            {this.presentRecipes()}
          </Grid>
        </Container>
      );
    } else {
      return (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }
  }
}
