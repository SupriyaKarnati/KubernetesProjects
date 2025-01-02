# Kubernetes Concepts: Container, Pod, and Deployment

This document explains the differences between **Container**, **Pod**, and **Deployment** in Kubernetes.

| **Aspect**              | **Container**                                                   | **Pod**                                                               | **Deployment**                                                           |
|-------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Definition**           | A lightweight executable unit that contains an application.      | A group of one or more containers sharing the same resources.         | A higher-level resource for managing the lifecycle of Pods.               |
| **Components**           | Contains a single application or service.                       | Can contain one or more containers.                                  | Manages a set of Pods, ensuring the desired state and number of replicas. |
| **Resource Sharing**     | Containers are isolated but can communicate via shared volumes.  | Containers within the same Pod share networking and storage.         | No resource sharing directly; it ensures the correct number of Pods.      |
| **Use Case**             | Running a specific service or application.                      | Running closely related services together in the same network space. | Managing application scaling and updates through Pods.                    |
| **Scaling**              | Does not handle scaling.                                        | Scaling requires creating more Pods.                                 | Manages scaling by adjusting the number of Pods through replicas.         |
| **Lifecycle**            | Container lifecycle is tied to the Pod it runs in.               | A Pod's lifecycle is tied to the containers within it.               | A Deployment's lifecycle ensures the Pods are in the desired state.      |
| **Update Strategy**      | No built-in update strategy.                                    | Updates need to be managed manually (e.g., replacing Pods).           | Supports rolling updates to minimize downtime during application changes. |
