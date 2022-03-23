import ContentLoader from 'react-content-loader';
import React, {FC, memo} from 'react';

const SpecialGroupSkeleton: FC = () => {
    return (
        <div className='special-group-skeleton'>
            <ContentLoader
                className='special-group-skeleton__svg'
                title=''
                width='100%'
                height='100%'
                backgroundColor="#fafafa"
                foregroundColor="#ededed"
                speed={1.8}
            >
                <rect className='special-group-skeleton__rect' rx={10} ry={10}/>
                <rect className='special-group-skeleton__rect' rx={10} ry={10}/>
            </ContentLoader>
        </div>
    );
};

export default memo(SpecialGroupSkeleton);