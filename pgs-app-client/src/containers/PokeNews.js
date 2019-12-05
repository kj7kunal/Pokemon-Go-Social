import React from "react";
import { PageHeader, ListGroup, ListGroupItem , Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {createPost, getAllPosts} from '../util/APIUtils';
import "./PokeNews.css";

class PokeNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      content: {value:''},
      posts: {value:[]}
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadAllPosts() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({
      isLoading: true
    });

    getAllPosts()
    .then(response => {
      this.setState({
        posts: response,
        isLoading: false
      });
    })
    .catch(error => {
      console.log(error.message);
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadAllPosts();
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

    createPost(postRequest)
    .then(response => {
        this.setState({ isLoading: false });
        this.setState({ content: {value: '' }});
        this.loadAllPosts();
        this.props.history.push("/pokenews");
    }).catch(error => {
        this.setState({ isLoading: false });
        this.setState({ content: {value: '' }});
        console.log(error.message);
    });
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
      <div className="PokeNews">
        <PageHeader>PokeNews</PageHeader>
        <div className="CreatePost">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content" bsSize="large">
              <ControlLabel>Create a new Post: </ControlLabel>
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
        <div className="PostList">
          <ListGroup>
            {!this.state.isLoading && this.renderPostList(this.state.posts)}
          </ListGroup>
        </div>
      </div>
    );
  }

}


export default PokeNews;
