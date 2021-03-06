import React, {PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import EditTeamName from 'universal/modules/teamDashboard/components/EditTeamName/EditTeamName';
import {
  DashContent,
  DashHeader,
  DashHeaderInfo,
  DashMain,
} from 'universal/components/Dashboard';
import {Link, withRouter} from 'react-router';
import DashboardAvatars from 'universal/components/DashboardAvatars/DashboardAvatars';
import TeamDashModal from '../TeamDashModal/TeamDashModal';


const faIconStyle = {
  fontSize: '14px',
  lineHeight: 'inherit',
  marginRight: '.25rem'
};

const linkStyle = {
  display: 'inline-block',
  height: '15px',
  lineHeight: '15px',
  marginRight: '1.5rem',
  textDecoration: 'none'
};

const standardLinks = (teamId) => {
  return (
    <div>
      <Link
        to={`/meeting/${teamId}`}
        style={linkStyle}
        title="Meeting Lobby"
      >
        <FontAwesome name="arrow-circle-right" style={faIconStyle}/> Meeting Lobby
      </Link>
      <Link
        to={`/team/${teamId}/settings`}
        style={linkStyle}
        title="Team Settings"
      >
        <FontAwesome name="cog" style={faIconStyle}/> Team Settings
      </Link>
    </div>
  );
};

const settingsLinks = (teamId) => {
  return (
    <div>
      <Link
        to={`/team/${teamId}`}
        style={linkStyle}
        title="Back to Team Dashboard"
      >
        <FontAwesome name="arrow-circle-left" style={faIconStyle}/> Back to Team Dashboard
      </Link>
    </div>
  );
};

// use the same object so the EditTeamName doesn't rerender so gosh darn always
const initialValues = {teamName: ''};

const Team = (props) => {
  const {children, router, team, teamMembers} = props;
  const teamId = team.id;
  const teamName = team.name;
  const hasOverlay = Boolean(team && team.meetingId);
  const isSettings = router.isActive(`/team/${teamId}/settings`, false);
  initialValues.teamName = teamName;
  const DashHeaderInfoTitle = isSettings ? <EditTeamName initialValues={initialValues} teamName={teamName} teamId={teamId}/> : teamName;
  return (
    <DashMain>
      {hasOverlay && <TeamDashModal teamId={teamId} teamName={teamName}/>}
      <DashHeader hasOverlay={hasOverlay}>
        <DashHeaderInfo title={DashHeaderInfoTitle}>
          {isSettings ? settingsLinks(teamId) : standardLinks(teamId)}
        </DashHeaderInfo>
        <DashboardAvatars teamMembers={teamMembers}/>
      </DashHeader>
      <DashContent hasOverlay={hasOverlay} padding="0">
        {children}
      </DashContent>
    </DashMain>
  );
};

Team.propTypes = {
  children: PropTypes.any,
  router: PropTypes.object,
  team: PropTypes.object.isRequired,
  teamMembers: PropTypes.array.isRequired,
};

export default withRouter(Team);
