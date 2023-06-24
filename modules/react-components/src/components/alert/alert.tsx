import classNames from "classnames";
import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import NotificationSystem from "react-notification-system";
import ErrorIcon from "../../assets/images/error-icon.svg";
import InfoIcon from "../../assets/images/info-icon.svg";
import SuccessIcon from "../../assets/images/success-icon.svg";
import WarningIcon from "../../assets/images/warning-icon.svg";
import { GenericIcon } from "../icon";

/**
 * Prop types interface for the Alert component.
 */
export interface AlertPropsInterface {
    /**
     * Unset the position of the alert.
     */
    absolute?: boolean;
    /**
     * Alert object.
     */
    alert: any;
    /**
     * Position of the notification. Available: tr (top right), tl (top left),
     * tc (top center), br (bottom right), bl (bottom left), bc (bottom center)
     */
    alertsPosition?: "tr" | "tl" | "tc" | "br" | "bl" | "bc";
    /**
     * Alert system instance.
     */
    alertSystem: any;
    /**
     * Settings controlling if the alert is dismissible or not.
     */
    dismissible?: boolean;
    /**
     * Delay in seconds for the alert to go away.
     */
    dismissInterval?: number;
    /**
     * Callback to be triggered to initialize the alert system.
     * @param ref - reference on top of which the alert system should be initialized
     */
    onAlertSystemInitialize: (ref: any) => void;
    /**
     * If the icon should be visible or not.
     */
    withIcon?: boolean;
}

/**
 * Icons for different alert states.
 */
const AlertIcons = {
    error: ErrorIcon,
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon
};

/**
 * Alert component to show success, error, warning and info notifications on the front end dashboards.
 *
 * @param props - Props injected in to the alert component.
 *
 * @returns the Alert component
 */
export const Alert: FunctionComponent<AlertPropsInterface> = (
    props: AlertPropsInterface
): ReactElement => {

    const {
        absolute,
        alert,
        alertsPosition,
        alertSystem,
        dismissible,
        dismissInterval,
        onAlertSystemInitialize,
        withIcon
    } = props;

    const [ , setIntermediateDissmissInterval ] = useState<number>(dismissInterval);

    const classes = classNames({
        absolute
    }, "");

    const alertRef = useRef(null);

    useEffect(() => {
        onAlertSystemInitialize(alertRef.current);
    }, []);

    /**
     * Triggered when a new alert is available on the redux store.
     */
    useEffect(() => {
        if (!alertSystem || !alert) {
            return;
        }

        let icon = null;

        switch (alert.level) {
            case "success" as string: {
                icon = AlertIcons.success;

                break;
            }
            case "WARNING" as string: {
                icon = AlertIcons.warning;

                break;
            }
            case "ERROR" as string: {
                icon = AlertIcons.error;

                break;
            }
            case "INFO" as string: {
                icon = AlertIcons.info;

                break;
            }
            default:
                break;
        }

        alertSystem.addNotification({
            autoDismiss: dismissInterval,
            dismissible,
            level: alert.level,
            message: (
                <div
                    className="alert-message"
                >
                    <div
                        className="header bold-text"
                    >
                        { alert.message }
                    </div>
                    <div
                        className="description"
                    >
                        { alert.description }
                    </div>
                </div>
            ),
            position: alertsPosition,
            title: withIcon
                ? (
                    <GenericIcon
                        icon={ icon }
                        colored
                        floated="left"
                        transparent
                        size="mini"
                        inline
                        spaced="right"
                        relaxed
                    />
                )
                : null
        });
    }, [ alert ]);

    return (
        <div
            /**
             * onMouseEnter will set the dissmissal value to 0 so untill mouse is left, the notification will
             * be shown.
             */
            onMouseEnter={ () => setIntermediateDissmissInterval(0) }
            /**
             * onMouseLeave will reset the value to initial value passed via props and will dissmiss the
             * notification once the time is hit.
             */
            onMouseLeave={ () => setIntermediateDissmissInterval(dismissInterval) }
            className={ `alert-wrapper ${ classes }` }
        >
            <NotificationSystem
                ref={ alertRef }
                style={ {
                    NotificationItem: {
                        DefaultStyle: {
                            cursor: "unset"
                        }
                    }
                } }
            />
        </div>
    );
};

/**
 * Prop types for the Alert component.
 */
Alert.defaultProps = {
    absolute: false,
    alertsPosition: "br",
    dismissInterval: 15,
    dismissible: true,
    withIcon: true
};
