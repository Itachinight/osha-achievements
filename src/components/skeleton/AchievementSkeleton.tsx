import React, {FC, memo} from 'react';
import ContentLoader from 'react-content-loader';

const AchievementSkeleton: FC = () => {
    return (
        <div className='perspective-card'>
            <ContentLoader
                title=''
                width='100%'
                height='100%'
                backgroundColor="#fafafa"
                foregroundColor="#ededed"
                speed={1.8}
            >
                <rect x={0} y={0} rx={10} ry={10} width='100%' height='100%'/>
            </ContentLoader>
        </div>
    );
};

export default memo(AchievementSkeleton);