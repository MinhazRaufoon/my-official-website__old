import { useCallback } from 'react'
import Loader from '../../components/Loader'
import Project from './Project'
import styles from './index.module.css'
import ProjectFilterPanel from './ProjectFilterPanel'
import { ReactComponent as FilterIcon } from '../../assets/icons/equalizer.svg'
import { createModal } from '../../components/modal'
import IconButton from '../../components/IconButton'
import useViewableProjects from './hooks/useViewableProjects'

export default function Projects() {
  const {
    isFetching,
    allProjects,
    visibleProjects,
    filterDescription,
    setVisibleProjects,
    setFilterDescription,
  } = useViewableProjects()

  const openFilterModal = useCallback(() => {
    createModal(
      <ProjectFilterPanel
        className={styles.filterPanelMobile}
        setFilterDescription={setFilterDescription}
        projects={allProjects}
        setVisibleProjects={setVisibleProjects}
      />
    )
  }, [allProjects, setVisibleProjects, setFilterDescription])

  if (isFetching) return <Loader center={true} />

  return (
    <div className={styles.Projects}>
      <ProjectFilterPanel
        className={styles.filterPanel}
        projects={allProjects}
        setVisibleProjects={setVisibleProjects}
        setFilterDescription={setFilterDescription}
      />

      <IconButton
        btnClassName={styles.filterPanelMobileOpener}
        onClick={openFilterModal}
        Icon={FilterIcon}
        iconProps={{ width: '2rem', height: '2rem' }}
        label="Filters"
      />

      <div className={styles.projectList}>
        {filterDescription && (
          <h1 className={styles.filterDesc}>{filterDescription}</h1>
        )}
        {visibleProjects.map((project, index) => (
          <Project
            key={project.id}
            project={project}
            invertLayout={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  )
}
