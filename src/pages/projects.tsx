import Container from '../components/container';
import GridContainer from '../components/grid-container';
import ResourcesContainer from '../components/resources-container';

export default function ProjectsPage() {
  return (
    <GridContainer
      css={{
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '1fr',
        gap: 16,
        padding: 16,
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        boxSizing: 'border-box',
        overflowY: 'hidden',
        '@media (max-width: 768px)': {
          overflowY: 'auto',
        },
      }}
    >
      <div>navbar</div>
      <GridContainer
        css={{
          gridTemplateColumns: '1fr 1.5fr 1fr',
          gridTemplateRows: '1fr',
          justifyContent: 'center',
          height: '100%',
          gap: 16,
          padding: 16,
          overflowY: 'hidden',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: 12,
            padding: 8,
          },
        }}
      >
        <ResourcesContainer />
        <Container>Container 2</Container>
        <Container>Container 3</Container>
        {/* <Container>Container 4</Container> */}
      </GridContainer>
      <div>footer</div>
    </GridContainer>
  );
}
