import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import {
  updateProfile,
  updateProfileVariables,
  userProfile
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  uploaded: boolean;
  uploading: boolean;
  file?: Blob;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    uploaded: false,
    uploading: false
  };
  public render() {
    const {
      email,
      firstName,
      lastName,
      profilePhoto,
      uploaded,
      uploading
    } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile updated!");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
            variables={{
              email,
              firstName,
              lastName,
              profilePhoto
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                profilePhoto={profilePhoto}
                onInputChange={this.onInputChange}
                loading={loading}
                onSubmit={updateProfileFn}
                uploaded={uploaded}
                uploading={uploading}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value, files }
    } = event;

    if (files) {
      this.setState({
        file: files[0]
      });
    }
    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto,
          uploaded: profilePhoto !== null
        } as any);
      }
    }
  };

  public onFileChange;
}

export default EditAccountContainer;
