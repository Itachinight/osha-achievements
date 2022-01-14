import React, {FC, memo} from "react";
import {AchievementWithUserData} from "../types";

type Props = Required<Pick<AchievementWithUserData, 'date'>>;

const AchievementDate: FC<Props> = ({date}) =>  <time className='achievement__date'>{date}</time>;

export default memo(AchievementDate);