import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {createPost, getAllPosts} from '../util/APIUtils';
import "./PokeNews.css";

class PokeNews extends React.Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: false,
      content: {value:''}
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.content.length > 0;
  }


  handleContentChange(event){
    const target = event.target;
    const inputValue = target.value;
    this.setState({ content: inputValue });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });
    const postRequest = {
      content: this.state.content
    };
    console.log(postRequest);

    createPost(postRequest)
    .then(response => {
        this.props.history.push("/pokenews");
    }).catch(error => {
        console.log(error.message);
    });
    this.setState({ content: {value: '' }});
    this.setState({ isLoading: false });
  }


  render() {
    return (
      <div className="CreatePost">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content" bsSize="large">
            <FormControl
              autoFocus
              componentClass="textarea"
              name="content"
              placeholder="Enter text.."
              defaultValue=""
              required={true}
              onChange={(event) => this.handleContentChange(event)}
            />
          </FormGroup>
          <Button block type="submit"
            bsStyle="primary"
            bsSize="large">
            POST
          </Button>
        </form>
      </div>
    );
  }
}


export default PokeNews;
