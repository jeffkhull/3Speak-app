import React, { Component } from 'react';
import Reflink from '../../../main/RefLink';
import DateTime from 'date-and-time';
import PlaySVG from '../../assets/img/play.svg';
import { FaUser } from 'react-icons/fa';
import convert from "convert-units";
import {Link, HashRouter} from 'react-router-dom';
import nsfwWarning from '../../assets/img/nsfw.png';
import IpfsLogo from '../../assets/img/ipfs-logo-vector-ice.svg';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Utils from '../../utils';

class VideoWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_info: props,
            permlink: props.permlink,
            reflink:Reflink.parse(this.props.reflink)
        }
    }
    async componentDidMount() {
        let thumbnailUrl;
        if(this.props.isNsfw === true) {
            thumbnailUrl = nsfwWarning;
        } else {
            thumbnailUrl = await Utils.video.getThumbnailURL(this.props.reflink)
        }
        this.setState({
            //video_info: await utils.accounts.permalinkToVideoInfo(this.props.reflink),
            reflink: Reflink.parse(this.props.reflink),
            thumbnailUrl
        })
    }
    render() {
        return (<HashRouter><div className=" col-lg-3 col-md-4 col-xl-2 col-xxl-2     col-6 p-2 mb-3 marg_bot1 videowidget-padding">
            <div className="teaser_holder text-center">
                <div className="card-label card-label-views">
                    <img className="play_i" src={PlaySVG} height="11px" />
                    <span>{this.props.views}</span>
                </div>
                <div className="card-label">
                    {(() => {
                        const pattern = DateTime.compile('mm:ss');
                        return DateTime.format(new Date(this.state.video_info.duration* 1000), pattern)
                    })()}
                </div>
                <a href={`#/watch/${this.props.reflink}`}>
                    <img style={{width: "100% !important", padding: "5px", width: "unset", /*height: "24em",*/ maxHeight: "13em"}} className="img-fluid bg-dark" src={this.state.thumbnailUrl} />
                </a>
            </div>
            <a href={`#/watch/${this.props.reflink}`}>
                <b data-toggle="tooltip" data-placement="bottom" title={this.state.video_info.title} className="max-lines word-break" data-original-title={this.state.video_info.title}>{this.state.video_info.title}</b>
            </a>
            <div className="mt-2">
                <span className="black_col">
                    <b><a href={`#/user/${this.props.reflink}`}> <FaUser/> {this.state.reflink.root}</a></b>
                </span>
                <br/>
                <span>{(() => {
                        const dateBest = convert((new Date() / 1) - (new Date(this.state.video_info.created) / 1)).from("ms").toBest()
                        if(Math.round(dateBest.val) >= 2) {
                            return `${Math.round(dateBest.val)} ${dateBest.plural} ago`
                        } else {
                            return `${Math.round(dateBest.val)} ${dateBest.singular} ago`
                        }
                    })()}</span>
                    {this.props.isIpfs ? <div className="card-label" style={{right: "10px", bottom: "25px"}}>
                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                Video available on IPFS
                            </Tooltip>
                        }>
                        <img className="play_i" src={IpfsLogo} height="17px" />
                    </OverlayTrigger>
                    </div> : null}
            </div>
        </div></HashRouter>);
    }
}

export default VideoWidget;