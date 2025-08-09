export default function FlexBox({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: '16px' }}>{children}</div>;
}
