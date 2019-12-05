import React from "react";
import { ListGroup, ListGroupItem , Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {searchPostByAlias} from '../util/APIUtils';
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      content: {value:''},
      posts: {value:[]}
    };
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  searchPosts(searchKey) {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({
      isLoading: true
    });

    searchPostByAlias(searchKey)
    .then(response => {
      this.setState({
        posts: response,
        isLoading: false
      });
    })
    .catch(error => {
      console.log(error.message);
      this.setState({
        isLoading: false,
        content: {value:''},
        posts: [{id: 123, content: "", createdBy: "No posts yet", updatedAt: ""}]
      });
    });
  }

  componentDidMount() {
    this.searchPosts();
  }

  validateForm() {
    return this.state.content.length > 0;
  }


  handleContentChange(event){
    event.preventDefault();
    const target = event.target;
    const inputValue = target.value;
    this.setState({ content: inputValue });
    this.setState({ isLoading: true });
    this.searchPosts(inputValue);
  }

  renderPostList(posts) {
    return [{}].concat(this.state.posts).map((post,i) =>
      i!==0
      ?<ListGroupItem key={post.id}>
        <h4>{post.createdBy}</h4>
        <h3>{post.content}</h3>
        <h5>{"Last Updated On: " + new Date(post.updatedAt)}</h5>
      </ListGroupItem>
      :<ListGroupItem key="new">
        <h5>
          ***
        </h5>
      </ListGroupItem>
    ).reverse();
  }

  render() {
    return (
      <div className="Search">
        <div className="SearchKey">
          <form>
            <FormGroup controlId="content" bsSize="large">
              <ControlLabel>Search for posts by a Trainer's Alias</ControlLabel>
              <FormControl
                autoFocus
                componentClass="textarea"
                name="content"
                placeholder="Enter trainer alias.."
                defaultValue=""
                required={true}
                onChange={(event) => this.handleContentChange(event)}
              />
            </FormGroup>
          </form>
        </div>
        <div className="PostList">
          <ListGroup>
            {!this.state.isLoading && this.renderPostList(this.state.posts)}
          </ListGroup>
        </div>
      </div>
    );
  }

}


export default Search;
