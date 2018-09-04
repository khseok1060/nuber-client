import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { userProfile } from "../../types/api";
import SettingsPresentor from "./SettingsPresenter";

class MiniProfileQuery extends Query<userProfile> {}

class SettingContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({data, loading: userDataLoading}) => (
              <SettingsPresentor
                userDataLoading={userDataLoading}
                userData={data}
                logUserOut={logUserOut}
              />
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingContainer;
