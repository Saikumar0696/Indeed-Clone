import React from 'react';
import {  Element, Events, animateScroll as scroll,  scroller } from 'react-scroll';

export default class FullJobDescription extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',  
        containerId: 'scroll-container'
      }));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  render() {
    const {jobData} = this.props
    return (
      <div>
          <Element name="test7" className="element" id="containerElement" style={{
            position: 'relative',
            height: '500px',
            overflow: 'scroll',
          }}>
            <Element name="firstInsideContainer" style={{
              }}>
                <div>
                <label style={{fontWeight:"700", fontSize:"22px"}}>Job Salary</label><br />
                <label style={{fontWeight:"700", fontSize:"17px"}}>Salary</label><br />
                <label style={{fontSize:"15px"}}>{'$' + jobData.salary +' a year'}</label><br />
                <label style={{fontWeight:"700", fontSize:"17px"}}>Job Type</label><br />
                <label style={{fontSize:"15px"}}>{jobData.jobType}</label>
                </div>
                <hr />
                <div>
                <label style={{fontWeight:"700", fontSize:"22px"}}>Full Job Description</label>
                <ul style={{marginLeft:"30px"}}> 
                    <li style={{listStyleType:"circle"}}>{jobData.jobDescription.compensation}{'.'}</li>
                    <li style={{listStyleType:"circle"}}>{jobData.jobDescription.responsibilites}{'.'}</li>
                    <li style={{listStyleType:"circle"}}>{jobData.jobDescription.requirement}{'.'}</li>
                    <li style={{listStyleType:"circle"}}>{jobData.jobDescription.moreInfo}{'.'}</li>
                </ul>
                </div>
            </Element>        
          </Element>
      </div>
    );
  }
};
