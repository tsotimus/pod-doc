import { cn } from '@/utils/client/cn';
import { PropsWithChildren } from 'react';
import { match } from 'ts-pattern';

type TypographyProps = {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'blockquote';
    className?: string;
};

const Typography = ({ variant = 'body', className, children }: PropsWithChildren<TypographyProps>) => {
    const Tag = match(variant)
        .with('h1', () => <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>)
        .with('h2', () => <h2 className={cn('mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0', className)}>{children}</h2>)
        .with('h3', () => <h3 className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>)
        .with('h4', () => <h4 className={cn('mt-6 text-xl font-semibold tracking-tight', className)}>{children}</h4>)
        .with('h5', () => <h5 className={cn('mt-4 text-lg font-semibold tracking-tight', className)}>{children}</h5>)
        .with('blockquote', () => <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>{children}</blockquote>)
        .with('body', () => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>)
        .otherwise(() => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>);

    return Tag;
};

export default Typography;