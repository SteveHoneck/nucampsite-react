import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb, 
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  CardImgOverlay
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'; //Added for Exercies: Fetch from server
import { FadeTransform, Fade, Stagger } from 'react-animation-components'; 


function RenderCampsite({campsite, favorite, postFavorite}) { //This funciton is receiving a props object from CampsiteInfo below, we want the "campsite" property of the object, so use curly braces to destructure it. Added for Integration: "favorite, postFavorite"
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
          in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(50%)'
          }}>
          <Card>
            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} /> {/*Tacks the text of the image property to the end of "baseUrl" in order to get the image from the json server  */}
            <CardImgOverlay> {/*Added for Integration: <CardImgOverlay>*/}
              <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(campsite._id)}>
                {
                  favorite ?
                    <i className="fa fa-heart" />
                    : 
                    <i className="fa fa-heart-o" />
                }
              </Button>
            </CardImgOverlay>
            <CardBody>
              <CardText>{campsite.description}</CardText>
            </CardBody>
          </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({comments, postComment, campsiteId}) {//This funciton is receiving a props object from CampsiteInfo function below, we want the "comments" property for use in the function below, so use curly braces to destructure it. The "addComment, campsiteId" properties are being destructured and just passed along to the <CommentForm> component.
  if (comments) { //if argument comments contain something (as opposed to nothing which would evaluate to falsy) enter loop, otherwise return a blank <div>.
    return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>  {/*NOTE FOR <Stagger>, MAKES APP CRASH IF NOTE ADDED ON LINE BELOW: Works on a group of elements. Needs boolean attribute of in*/}
          <Stagger in>
            {comments.map(comment => { //Argument "comments" is an array from campsites.js. It is made available/passed into this function by the render function/method below.  JSX can only accept one return value from the .map loop so to make the comment.text and comment.author appear on different lines, they must be wrapped in an outer <div> with <p> and line break <br/> to provide proper spacing. Multiple <div>s can be used around the comment.text and comment.date, but they must be in one outer return <div> (spacing is not as nice with this method).
              return ( //I did not have this "return" in here & it was working after week 2 workshop, but the lectures had it in here so I added it.
                <Fade in key={comment._id}> {/*Needs boolean attribute of in. Unique "key" must always go on the top most element (was in the <div> from previous exercise)*/}
                  <div>
                    <p>{comment.text}</p>
                    <p>{comment.rating} stars</p>
                    <p>-- {comment.author.firstname} {comment.author.lastname} , {/*Added for Integration: comment.author.x */} 
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(comment.updatedAt)))}
                    </p>
                  </div>
                </Fade>
              );
            })}
          </Stagger>
          <CommentForm campsiteId={campsiteId} postComment={postComment} />
        </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) { //This is recieving a campsite, isLoading, errMess objects as props from MainComponent. campsite is a campsite from the campsites.js file that was filtered in MainComponent.js (THIS MAY NOT BE TRUE ANYMORE???).
  if (props.isLoading) { //Added due to Thunk, if isLoading is true, return the <Loading> component
    return ( //a Bootstrap Grid setup is expected to be returned
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
  }
  if (props.errMess) {//Added due to Thunk, if errMess is true, return the errMess object
    return ( //a Bootstrap Grid setup is expected to be returned
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem> {/* Add text for active link dynamically through props.campsite.name*/}
              </Breadcrumb>
              <h2>{props.campsite.name}</h2>{/* Add text for heading dynamically through props.campsite.name*/}
              <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} favorite={props.favorite} postFavorite={props.postFavorite}/> {/*Added for Integration: "favorite" & "postFavoirte"*/}
          <RenderComments 
            comments={props.comments} ///*Pass the comments array as props (now labeled "comments") to RenderComment. It was passed from Main component to CampsiteInfo component, and now is being passed to RenderComments component. This USED TO pass the "comments" array from the campsites.js file into the RenderComments method/function. "comments" array WAS being made available as "props" to this CampsiteInfoComponent.js file because the CampsiteInfo component is called with an attribute named "campsite" inside the JSX tag in the MainComponent.js file, which passes it as "props" to this file.*/
            postComment={props.postComment} //<CampsiteInfo> is recieveing this as a prop from main as a result of adding Redux actions, and it is in turn getting passed to <RenderComments>
            campsiteId={props.campsite._id} //<CampsiteInfo> is recieveing this as a prop from main as a result of adding Redux actions, and it is in turn getting passed to <RenderComments>
          /> 
        </div>
      </div>
    );
  }
  return <div />;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    
    /*
    --Use if not using arrow functions--
    this.toggleModal = this.toggleModal.bind(this);
    this.submitComment = this.submitComment.bind(this);*/
  }

  /*
  --Use if not using arrow functions--
  toggleModal () {
    this.setState(
      {isModalOpen: !this.state.isModalOpen}
      );
  }


  submitComment(values) {
    console.log(values);
    alert();
    this.toggleModal();
  }
*/

    
  /*If using arrow functions instead of bindings, where should they be: They should be in the Class component, not the render() because render() gets called everytime something changes, so that code would be re-run unnecessarily.*/
  toggleModal = () => { //If creating inside the Class component, you cannot use "const" or "function" just because of how Class works.  If these were inside the render() or in thier own 'functional component', "conts" and "function" could be used. 
    this.setState(
      {isModalOpen: !this.state.isModalOpen}
      );
  } 
  
  submitComment = (values) => {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.text);//When the form is submitted, the postComment action creator will create an action using the values from this form. Then that action will get dispatched to it's reducer which will update the state
  } 

  render() {
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"/> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={ (values) => this.submitComment(values) }>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select 
                  model=".rating" 
                  id="rating" 
                  name="rating" 
                  className="form-control"
                  defaultValue="5">{/*React-Redux-Form: If this is not included, the form will not submit if the user does not deselected then reselect a value.*/}
                    <option value='1'>1</option> 
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea 
                model=".text" 
                id="text" 
                name="text" 
                className="form-control"
                rows="6" 
                />
              </div>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

}

export default CampsiteInfo;
