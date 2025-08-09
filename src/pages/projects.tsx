import { useParams } from 'react-router-dom';
import GridContainer from '../components/grid-container';
import Navbar from '../components/navbar';
import RecommendationContainer from '../components/recommendation-container';
import ResourcesContainer from '../components/resources-container';
import SummaryContainer from '../components/summary-container';
import {
  useProjectItems,
  useProjectSummaries,
  useRecommendations,
} from '../hooks/projects/use-projects';
import { ToggleFixedResponseDto } from '../types/dto/projects.dto';

export default function ProjectsPage() {
  const params = useParams();
  const projectId = params.id;

  const projectIdNumber = parseInt(projectId ?? '', 10);

  const {
    items: projectItems,
    loading: itemsLoading,
    error: itemsError,
    refetch: refetchItems,
  } = useProjectItems(projectIdNumber);

  const {
    summaries: projectSummaries,
    loading: summariesLoading,
    error: summariesError,
    refetch: refetchSummaries,
  } = useProjectSummaries(projectIdNumber);

  const {
    recommendations,
    loading: recommendationsLoading,
    error: recommendationsError,
  } = useRecommendations();

  // Handle items being toggled from recommendations to resources
  const handleItemsToggled = async (toggledItems: ToggleFixedResponseDto[]) => {
    console.log('Items toggled:', toggledItems);
    // Refetch project items to update the isFixed status
    await refetchItems();
  };

  // Handle summary refresh after toggle operations
  const handleSummaryRefresh = async () => {
    console.log('Refreshing summaries...');
    await refetchSummaries();
  };

  // Handle resource addition and refresh
  const handleResourceAdded = async () => {
    console.log('Resource added, refreshing items...');
    await refetchItems();
    await refetchSummaries(); // Also refresh summaries when new resources are added
  };

  if (!projectId) {
    return <div>프로젝트 ID가 없습니다.</div>;
  }

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
      <Navbar userName="Developer Kim" userEmail="developer@infobridge.com" />
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
        <ResourcesContainer
          items={projectItems.filter(item => item.isActive && item.isFixed)}
          loading={itemsLoading}
          error={itemsError}
          projectId={projectIdNumber}
          onResourceAdded={handleResourceAdded}
        />
        <SummaryContainer
          summaries={projectSummaries}
          loading={summariesLoading}
          error={summariesError}
          onRefresh={refetchSummaries}
        />
        <RecommendationContainer
          recommendations={projectItems.filter(
            item => item.isActive && !item.isFixed
          )}
          loading={itemsLoading}
          error={itemsError}
          onItemsToggled={handleItemsToggled}
          onSummaryRefresh={handleSummaryRefresh}
        />
        {/* <Container>Container 4</Container> */}
      </GridContainer>
    </GridContainer>
  );
}
